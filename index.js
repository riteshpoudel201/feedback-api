import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
dotenv.config();

const PORT = process.env.PORT || 8000;
const app= express();
app.use(express.json());
app.use(cors())
app.post("/feedback", async (req,res)=>{
    const { from, to, name, email, messageBody} = req.body;

    const Email = {
        from,
        to,
        subject:`From ${email}`,
        html: messageBody,
      }
      try{
      const response = await axios.post('https://api.resend.com/emails', Email ,{
        headers:{
         "Authorization":`Bearer ${process.env.RESEND_API_KEY}`
        }
       })
       if(response.data){
        res.status(201).json({
            success:true,
            data: response.data
        })
       }
      }catch(error){
        console.log(error);
        res.json({
            success:false,
            data: error
        })
       }
})
app.listen(PORT, (error)=>{
    if(error){
        console.log(error)
    }else{
        console.log("Server is up and running at: ", PORT)
    }
})