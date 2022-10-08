<template>
   <apexchart class="statistic" type="bar" :options="options" :series="values"></apexchart>
</template>

<script>
import { computed } from 'vue';
import VueApexCharts from "vue3-apexcharts";
export default {
   props: {
      data: Array
   },
   components: {
      apexchart: VueApexCharts
   },
   setup(props) {
      const values = computed(() => [
         {
            name: 'completed = true',
            data: props.data.map(item => item.completed)
         },
         {
            name: 'completed = false',
            data: props.data.map(item => item.count - item.completed)
         }
      ])

      const options = computed(() => {
         return {
            chart: {
               type: 'bar',
               height: 300,
               stacked: true,
               toolbar: {
                  show: true
               },
               zoom: {
                  enabled: true
               }
            },
            responsive: [{
               breakpoint: 480,
               options: {
                  legend: {
                     position: 'bottom',
                     offsetX: -10,
                     offsetY: 0
                  }
               }
            }],
            plotOptions: {
               bar: { horizontal: false },
            },
            xaxis: {
               categories: props.data.map(item => `user - ${item.userId}`)
            },
            legend: {
               position: 'right',
               offsetY: 40
            },
            fill: {
               opacity: 1
            }
         }
      })

      return {
         values,
         options
      }
   }
}
</script>
