<template>
  <div>
    <table>
      <tr>
        <th>代號</th>
        <th>數量</th>
        <th>現金</th>
        <th>股票</th>
        <th>合計</th>
      </tr>
      <tr v-for="(entry, index) in calculateData.stockList" :key="index"></tr>
    </table>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import axios from 'axios';

const calculateData = reactive({
  stockList: [],
  total: 0,
});

const StockInfoData = reactive({
  StockPrice: {},
  InstitutionalInvestor: {},
  Shareholding: {},
  TaiwanStockDividend: {},
  TaiwanFinancialStatements: {},
  TaiwanCashFlowsStatement: {},
  TaiwanBalanceSheet: {},
  TaiwanNews: {},
});

const autoCompleteResponse = async (value) => {
  selectedStock.value = value.replace(/\D/g, '');
  //console.log(JSON.stringify(selectedStock));
  let response = (await axios.get(`${URL.STOCK_INFO}${selectedStock.value}`))
    .data.data;
  Object.keys(StockInfoData).forEach((key) => {
    StockInfoData[key] = response[key];
  });
  //console.log(JSON.stringify(StockInfoData));
  //return StockPrice;
  //console.log(resultModel.StockPrice.update_date);
};
</script>
