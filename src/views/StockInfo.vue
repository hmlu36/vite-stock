<template>
  <div class="container">
    <div class="row">
      <div class="input-field col s6 m2">
        <input type="text" name="autocomplete" />
        <label>個股代碼或名稱</label>
      </div>
    </div>
  </div>
  <div class="row">
    <h5 v-if="Object.keys(StockInfoData.StockPrice).length > 0">
      日期:{{ StockInfoData.StockPrice.update_date.replace(/-/g, '/') }}
    </h5>
    <div
      class="card horizontal col s12 m6"
      v-if="Object.keys(StockInfoData.StockPrice).length > 0"
    >
      <div class="card-stacked">
        <div class="card-content">
          <span class="card-title"
            ><i class="material-icons prefix">ev_station</i> 股價</span
          >
          <table class="striped">
            <tr>
              <th class="center-align">項目</th>
              <th class="center-align">數量</th>
            </tr>
            <tr>
              <td class="right-align">漲跌</td>
              <td
                class="right-align"
                :style="{
                  color:
                    StockInfoData.StockPrice.StockPrice.spread > 0
                      ? 'red'
                      : 'green',
                }"
              >
                {{ StockInfoData.StockPrice.StockPrice.spread }}
                {{
                  '(' +
                  StockInfoData.StockPrice.StockPrice.spread_per * 100 +
                  '%)'
                }}
              </td>
            </tr>
            <tr>
              <td class="right-align">開盤 / 收盤</td>
              <td class="right-align">
                {{ StockInfoData.StockPrice.StockPrice.open }} /
                {{ StockInfoData.StockPrice.StockPrice.close }}
              </td>
            </tr>
            <tr>
              <td class="right-align">最高 / 最低</td>
              <td class="right-align">
                {{ StockInfoData.StockPrice.StockPrice.max }} /
                {{ StockInfoData.StockPrice.StockPrice.min }}
              </td>
            </tr>
            <tr>
              <td class="right-align">交易量 / 金額</td>
              <td class="right-align">
                {{
                  formatNumber(
                    StockInfoData.StockPrice.StockPrice.Trading_Volume
                  )
                }}
                /
                {{
                  formatNumber(
                    StockInfoData.StockPrice.StockPrice.Trading_money
                  )
                }}
              </td>
            </tr>
            <tr>
              <td class="right-align">RSV</td>
              <td class="right-align">
                {{ StockInfoData.StockPrice.TechIndex.rsv }}
              </td>
            </tr>
            <tr>
              <td class="right-align">BAIS</td>
              <td class="right-align">
                {{ StockInfoData.StockPrice.TechIndex.bias }}
              </td>
            </tr>
            <tr>
              <td colspan="2" class="right-align">
                {{ '5ma:' + StockInfoData.StockPrice.MovingAverage.week }}
                {{ ', 20ma:' + StockInfoData.StockPrice.MovingAverage.month }}
                {{ ', 60ma:' + StockInfoData.StockPrice.MovingAverage.period }}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div
      class="card horizontal col s12 m6"
      v-if="Object.keys(StockInfoData.InstitutionalInvestor).length > 0"
    >
      <div class="card-stacked">
        <div class="card-content">
          <span class="card-title">
            <i class="material-icons prefix">account_circle</i> 三大法人</span
          >
          <table class="striped">
            <tr>
              <th class="center-align">單位名稱</th>
              <th class="center-align">買進</th>
              <th class="center-align">賣出</th>
              <th class="center-align">買賣差</th>
            </tr>
            <tr
              v-for="(investor, index) in StockInfoData.InstitutionalInvestor
                .InstitutionalInvestor"
              :key="index"
            >
              <td>{{ investor.zh_name }}</td>
              <td class="right-align">{{ formatNumber(investor.buy) }}</td>
              <td class="right-align">{{ formatNumber(investor.sell) }}</td>
              <td class="right-align">{{ formatNumber(investor.spread) }}</td>
            </tr>
            <td>合計</td>
            <td class="right-align">
              {{
                formatNumber(
                  sum(
                    StockInfoData.InstitutionalInvestor.InstitutionalInvestor,
                    'buy'
                  )
                )
              }}
            </td>
            <td class="right-align">
              {{
                formatNumber(
                  sum(
                    StockInfoData.InstitutionalInvestor.InstitutionalInvestor,
                    'sell'
                  )
                )
              }}
            </td>
            <td class="right-align">
              {{
                formatNumber(
                  sum(
                    StockInfoData.InstitutionalInvestor.InstitutionalInvestor,
                    'spread'
                  )
                )
              }}
            </td>
            <tr v-if="Object.keys(StockInfoData.Shareholding).length > 0">
              <td colspan="4" class="right-align">
                外資持股比例
                {{
                  StockInfoData.Shareholding.Shareholding[0]
                    .ForeignInvestmentSharesPer
                }}%
                {{
                  '(' + StockInfoData.Shareholding.Shareholding[0].date + ')'
                }}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="row" v-if="!!selectedStock">
    <div class="card col s12 m6">
      <span class="card-title">EPS</span>
      <canvas id="EPSChart"></canvas>
    </div>
    <div class="card col s12 m6">
      <span class="card-title">月營收</span>
      <canvas id="TaiwanMonthRevenueChart"></canvas>
    </div>
  </div>
  <div class="row">
    <div
      class="card horizontal col s12 m6"
      v-if="Object.keys(StockInfoData.TaiwanStockDividend).length > 0"
    >
      <div class="card-stacked">
        <div class="card-content">
          <span class="card-title"
            ><i class="material-icons prefix">blur_circular</i>
            現金股票股利</span
          >
          <table class="striped">
            <tr>
              <th class="center-align">年度</th>
              <th class="center-align">交易日</th>
              <th class="center-align">發放日</th>
              <th class="center-align">現金</th>
              <th class="center-align">股票</th>
            </tr>
            <tr
              v-for="(cashDividend, index) in StockInfoData.TaiwanStockDividend
                .CashDividend"
              :key="index"
            >
              <td class="center-align">{{ cashDividend.year }}</td>
              <td class="center-align">
                {{
                  cashDividend.CashDividendDealDate.substring(
                    5,
                    cashDividend.CashDividendDealDate.length
                  ).replace('-', '/')
                }}
              </td>
              <td class="center-align">
                {{
                  cashDividend.CashDividendReleaseDate.substring(
                    5,
                    cashDividend.CashDividendReleaseDate.length
                  ).replace('-', '/')
                }}
              </td>
              <td class="right-align">
                {{ Math.round(cashDividend.CashDividend * 100) / 100 }}
              </td>
              <td class="right-align">
                {{
                  Math.round(
                    StockInfoData.TaiwanStockDividend.StockDividend[index]
                      .StockDividend * 100
                  ) / 100
                }}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div
      class="col s12 m6"
      v-if="Object.keys(StockInfoData[financialGrids[0].key]).length > 0"
    >
      <ul class="tabs left-align">
        <li
          class="tab"
          v-for="(financialTab, index) in financialGrids"
          :key="index"
        >
          <a
            href="#"
            :class="[{ active: selectedTab == financialTab.key }]"
            @click.prevent="selectedTab = financialTab.key"
            >{{ financialTab.label }}</a
          >
        </li>
      </ul>
      <div
        v-for="(financialTab, index) in financialGrids.filter(
          (entry) => entry.key != 'TaiwanNews'
        )"
        :key="index"
        :class="[{ active: selectedTab == financialTab.key }]"
        :style="[
          { display: selectedTab == financialTab.key ? 'block' : 'none' },
        ]"
      >
        <div
          v-if="Object.keys(StockInfoData[financialTab.key]).length > 0"
          class="card"
        >
          <div class="card-content">
            <span class="center-align card-title">{{
              StockInfoData[financialTab.key].update_date
            }}</span>
            <table class="striped">
              <tr>
                <th class="center-align">項目</th>
                <th class="center-align">季增</th>
                <th class="center-align">年增</th>
                <th class="center-align">元</th>
              </tr>
              <tr
                v-for="(entry, index) in StockInfoData[financialTab.key][
                  financialTab.key
                ]"
                :key="index"
              >
                <td class="right-align">{{ entry.origin_name }}</td>
                <td class="right-align">{{ entry.valueQoQ }}%</td>
                <td class="right-align">{{ entry.valueYoY }}%</td>
                <td class="right-align">
                  {{ formatNumber(entry.value) }}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div
        :class="[{ active: selectedTab == 'TaiwanNews' }]"
        :style="[{ display: selectedTab == 'TaiwanNews' ? 'block' : 'none' }]"
      >
        <div v-if="Object.keys(StockInfoData.TaiwanNews).length > 0">
          <table class="striped">
            <tr>
              <th class="center-align">時間</th>
              <th class="center-align">標題</th>
            </tr>
            <tr
              v-for="(news, index) in StockInfoData.TaiwanNews.TaiwanNews"
              :key="index"
            >
              <td>{{ news.date }}</td>
              <td>
                <a :href="news.link" target="_blank">{{ news.title }}</a>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import axios from 'axios';
import URL from '../config/url';
import Chart from 'chart.js/auto';

const selectedStock = ref('');
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

const financialGrids = [
  { key: 'TaiwanNews', label: '新聞' },
  { key: 'TaiwanFinancialStatements', label: '財報' },
  { key: 'TaiwanCashFlowsStatement', label: '現金流量表' },
  { key: 'TaiwanBalanceSheet', label: '資產負債表' },
];

const selectedTab = ref(financialGrids[0].key);

const getList = async () => {
  const response = (
    await axios.get(`${URL.STOCK_LIST}`).catch((error) => {
      console.log(error);
      return axios.get(`${URL.STOCK_LIST}`);
    })
  ).data;

  const data = response.data.map((item) => {
    return response.select_columns.reduce((obj, column, index) => {
      obj[column] = item[index];
      return obj;
    }, {});
  });
  return data;
};

const initAutoComplete = async () => {
  const data = await getList();
  //console.log(JSON.stringify(data));
  const tempData = {};
  data.forEach((entry) => {
    tempData[entry.股票代號 + entry.股票名稱] = null;
  });
  //console.log(JSON.stringify(tempData));
  M.Autocomplete.init(document.getElementsByName('autocomplete'), {
    data: tempData,
    onAutocomplete: autoCompleteResponse,
  });
};

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
  await initChart();
};

const sum = (array, key) => {
  return array.reduce((a, b) => a + (b[key] || 0), 0);
};

const formatNumber = (value) => {
  const numberLength = value.toString().length;
  if (numberLength > 8) {
    return format100million(value);
  } else if (numberLength > 4) {
    return format10thousand(value);
  }
  return value;
};

const format10thousand = (value) => {
  return Math.round((value * 100) / 10000) / 100 + '萬';
};

const format100million = (value) => {
  return Math.round((value * 100) / 100000000) / 100 + '億';
};

const initChart = async () => {
  const responseData = (
    await axios.get(`${URL.STOCK_INFO_PLOT}${selectedStock.value}`)
  ).data.data;
  //console.log(JSON.stringify(Object.keys(responseData)));

  Object.keys(responseData).forEach((key) => {
    const entry = responseData[key];
    console.log(JSON.stringify(entry));
    new Chart(document.getElementById(`${key}Chart`), {
      type: 'line',
      data: {
        labels: entry.data.labels,
        datasets: [
          {
            data: entry.data.series.flat(),
            fill: false,
            borderColor: '#ff0000',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: false,
          },
          subtitle: {
            display: true,
            color: '#198964',
            text:
              (!!entry.MoM ? `月增 ${entry.MoM}%` : '') +
              (!!entry.QoQ ? `季增 ${entry.QoQ}%` : '') +
              `, 年增 ${entry.YoY}%`,
          },
        },
      },
    });
  });
};

onMounted(async () => {
  await initAutoComplete();
});
</script>
<style scoped>
a {
  color: #198964;
}

.tabs .tab a {
  color: #198964;
} /*Black color to the text*/

.tabs .tab a:hover {
  color: #0056b3;
} /*Text color on hover*/

.tabs .tab a.active {
  color: #fff;
  background-color: #198964;
} /*Background and text color when a tab is active*/

.tabs .indicator {
  background-color: #004d40;
} /*Color of underline*/
</style>
