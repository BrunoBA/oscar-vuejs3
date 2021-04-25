<template>
<span @click="exportChoices()" class="btn btn-warning">
  Export to PDF
</span>
</template>

<script lang="ts">

import {Options, Vue} from 'vue-class-component';
import {Bets} from '@/model/Bets';

@Options({
  props: {
    bets: Bets
  },
  name: "ExportToPdf"
})
export default class ExportToPdf extends Vue {
  bets!: Bets

  exportChoices() {
    console.log(JSON.stringify(this.bets))
  }
}
</script>

<style scoped>

</style>
