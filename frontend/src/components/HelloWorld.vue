<template>
  <div class="container-fluid">
    <h1>{{ title }}</h1>
    <div class="row">
      <div class="col-6">
        <span class="clickable" @click="previousCategory" v-show="disablePrevious">Previous</span>
      </div>
      <div class="col-6">
        <span class="clickable" @click="nextCategory" v-show="disableNext">Next</span>
      </div>
    </div>
    <template v-if="!isLoading">
      <div class="row m-5">
        <div class="col-12 text-uppercase font-weight-bold">
          {{ getCurrentCategoryName }}
        </div>
      </div>
      <ul class="row list-group">
        <li @click="selectWinner(winner)" class="list-group-item list-group-item-action text-center clickable"
            :class="{
              'list-group-item-warning font-weight-bold': winner === betForCurrentCategory
            }"
            :key="nominee"
            v-for="(nominee, winner) in getNominees">
          {{ nominee }}
        </li>
      </ul>
      <div v-show="isComplete" class="row">
        <div class="mt-5 col-12 text-center">
          <ExportToPdf :bets="bets"/>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import axios from 'axios';
import {Categories} from '@/model/Categories';
import {Bets} from '@/model/Bets';
import ExportToPdf from '@/components/ExportToPdf.vue';

@Options({
  props: {
    title: String
  },
  components: {ExportToPdf}
})

export default class HelloWorld extends Vue {
  title!: string

  private categories?: Categories;
  private currentCategoryId = 1;
  private isLoading = true;
  private bets = new Bets([]);

  async created() {
    const request = await axios.get('http://localhost:80/oscar');
    this.isLoading = false;
    this.categories = request.data;
  }

  nextCategory(): void {
    if (this.currentCategoryId < 23) {
      this.currentCategoryId += 1;
    }
  }

  previousCategory(): void {
    if (this.currentCategoryId > 1) {
      this.currentCategoryId -= 1;
    }
  }

  selectWinner(winner: number) {
    this.bets.addChoice(this.currentCategoryId, winner)
    this.nextCategory()
  }

  get disablePrevious(): boolean {
    return this.currentCategoryId !== 1;
  }

  get disableNext(): boolean {
    return this.currentCategoryId !== 23;
  }

  get getCurrentCategoryName(): string {
    const cat = this.categories?.categories.find(category => category.id == this.currentCategoryId);
    if (cat == undefined) {
      return 'error';
    }

    return cat.name;
  }

  get getNominees(): Array<string> {
    const cat = this.categories?.categories.find(category => category.id == this.currentCategoryId);
    if (cat !== undefined) {
      return cat.nominees;
    }
    return ['error'];
  }

  get betForCurrentCategory(): number | null {
    return this.bets.getWinnerByCategory(this.currentCategoryId)
  }

  get isComplete(): boolean {

    return this.bets.isComplete()
  }
}
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
