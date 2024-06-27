const express=require('express');
require('dotenv').config();
const PORT=process.env.PORT;
const app=express();
app.listen(PORT,()=>{
    console.log(`server running at ${PORT}`)
})


app.use(express.json())
const cors=require('cors')
app.use(cors())




//Routes
const userRoutes=require('./Routes/RoutesUser');
app.use('/api',userRoutes)


const adminRoutes=require('./Routes/RoutesAdmin');
app.use('/api',adminRoutes);


const donateRoutes=require('./Routes/RoutesDonate');
app.use('/api',donateRoutes);


const requestRoutes=require('./Routes/RoutesRequest');
app.use('/api',requestRoutes);

const volunteerRoutes=require('./Routes/RoutesVolunteer');
app.use('/api',volunteerRoutes);




//mongodb connection
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/anadhseva').then(()=>{
    console.log("connection successful");
})
.catch(()=>{
    console.log("connection failed")
})