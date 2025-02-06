const ForecastModel = require("../../models/forecast/forecastModel");
const AppErrorGlobal = require("../../utility/appErrorGlobal");
const asyncWrap = require("../../utility/ayncWrap");




exports.createForecast =  asyncWrap( async (req, res, next)=>{
    if(!req.body) AppErrorGlobal(next("No forecast Data is Received", 400));


    console.log(req.body);
    
   const forecastData = await ForecastModel.create(req.body);


   res.status(200).json({
    status:200,
    message: 'Forecast is created Successfully',
    data: forecastData
   })
})


exports.getForecast =  asyncWrap( async (req, res, next)=>{
      
    
   const forecastData = await ForecastModel.find({}).populate('teamMemberId');

   


   res.status(200).json({
    status:200,
    message: 'Forecast is fetched Successfully',
    data: forecastData
   })
})

