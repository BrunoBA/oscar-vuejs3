<template>
<span @click="exportChoices()" class="btn btn-warning no-select">
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

  async exportChoices() {
    try {
      const response = await fetch('http://oscar.app.br/oscar', {
        method: 'post',
        body: JSON.stringify(this.bets)
      })
      const hash = await response.text()
      console.log(hash)

      window.location.href = `http://oscar.app.br/oscar/${hash}?render`
      await fetch(`http://oscar.app.br/oscar/${hash}?render`).finally(() => {
        console.log('done')
      })

    } catch (Error) {
      alert('Sorry Try again later')
    }
  }
}
</script>

<style scoped>

.no-select {
  user-select: none;
}
</style>
