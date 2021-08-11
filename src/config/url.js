export default {
    CORS_ANYWHERE: 'https://cors-anywhere.herokuapp.com/',
    STOCK_LIST: 'https://sheethub.com/data.gov.tw/盤後資訊 > 個股日本益比、殖利率及股價淨值比（依代碼查詢）?format=json&download=1',
    //STOCK_INFO: 'https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_${code}.tw&json=1&delay=0',
    STOCK_INFO: "https://api.web.finmindtrade.com/v2/taiwan_stock_analysis?stock_id=",
    STOCK_INFO_PLOT: "https://api.web.finmindtrade.com/v2/taiwan_stock_analysis_plot?stock_id=",
    STOCK_DAILY_INFO: 'https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=${date}&stockNo=${code}'
};