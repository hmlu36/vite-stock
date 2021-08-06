<template>
  <div class="container">
    <div class="col s12">
      <div class="row">
        <div class="input-field col s6 m2">
          <input type="text" name="autocomplete" />
          <label>個股資訊</label>
        </div>
      </div>
    </div>

    <div class="row">
      <h5 v-if="Object.keys(StockInfoData.StockPrice).length > 0">
        日期:{{ StockInfoData.StockPrice.update_date }}
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
            <table>
              <tr>
                <th class="center-align">項目</th>
                <th class="center-align">數量</th>
              </tr>
              <tr>
                <td class="right-align">漲跌</td>
                <td class="right-align">{{ StockInfoData.StockPrice.StockPrice.spread }}</td>
              </tr>
              <tr>
                <td class="right-align">開盤</td>
                <td class="right-align">{{ StockInfoData.StockPrice.StockPrice.open }}</td>
              </tr>
              <tr>
                <td class="right-align">收盤</td>
                <td class="right-align">{{ StockInfoData.StockPrice.StockPrice.close }}</td>
              </tr>
              <tr></tr>
              <tr>
                <td class="right-align">最高 / 最低</td>
                <td class="right-align">
                  {{ StockInfoData.StockPrice.StockPrice.max }} /
                  {{ StockInfoData.StockPrice.StockPrice.min }}
                </td>
              </tr>
              <tr>
                <td class="right-align">交易量</td>
                <td class="right-align">
                  {{ format10000(StockInfoData.StockPrice.StockPrice.Trading_Volume) }}
                </td>
              </tr>
              <tr>
                <td class="right-align">交易金額</td>
                <td class="right-align">
                  {{ format10000(StockInfoData.StockPrice.StockPrice.Trading_money) }}
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
            <table>
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
                <td class="right-align">{{ format10000(investor.buy) }}</td>
                <td class="right-align">{{ format10000(investor.sell) }}</td>
                <td class="right-align">{{ format10000(investor.spread) }}</td>
              </tr>
              <td>合計</td>
              <td class="right-align">
                {{
                  format10000(
                    sum(StockInfoData.InstitutionalInvestor.InstitutionalInvestor, "buy")
                  )
                }}
              </td>
              <td class="right-align">
                {{
                  format10000(
                    sum(StockInfoData.InstitutionalInvestor.InstitutionalInvestor, "sell")
                  )
                }}
              </td>
              <td class="right-align">
                {{
                  format10000(
                    sum(
                      StockInfoData.InstitutionalInvestor.InstitutionalInvestor,
                      "spread"
                    )
                  )
                }}
              </td>
              <tr></tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted } from "vue";
import axios from "axios";
import URL from "../config/url";

export default defineComponent({
  name: "StockInfo",
  setup() {
    const selectedStock = reactive({ key: "", label: "" });
    const StockInfoData = reactive({
      StockPrice: {},
      InstitutionalInvestor: {},
    });

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
      M.Autocomplete.init(document.getElementsByName("autocomplete"), {
        data: tempData,
        onAutocomplete: autoCompleteResponse,
      });
    };

    const autoCompleteResponse = async (value) => {
      selectedStock.key = value.replace(/\D/g, "");
      selectedStock.label = value.replace(/[0-9]/g, "");
      //console.log(JSON.stringify(selectedStock));
      let response = (await axios.get(`${URL.STOCK_INFO}${selectedStock.key}`)).data.data;
      Object.keys(StockInfoData).forEach((key) => {
        StockInfoData[key] = response[key];
      });
      //console.log(JSON.stringify(StockInfoData));
      //return StockPrice;
      //console.log(resultModel.StockPrice.update_date);
    };

    const sum = (array, key) => {
      return array.reduce((a, b) => a + (b[key] || 0), 0);
    };

    const format10000 = (value) => {
      return Math.round(value / 10000) + "萬";
    };

    onMounted(async () => await initAutoComplete());

    return { selectedStock, StockInfoData, sum, format10000 };
  },
});
</script>
<style scoped>
a {
  color: #42b983;
}
</style>
