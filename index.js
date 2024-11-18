const express=require("express");
const cors=require("cors");
const {MongoClient}=require("mongodb");

const app=express();
app.use(cors());
app.use(express.json());

		const url="mongodb+srv://archanasalunke137:RXIed67yy9ykXH1x@cluster0.ucdml.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
		const con=new MongoClient(url);
		const database=con.db("sms18nov24");
		const collection=database.collection("student");

app.post("/save",(req,res)=>{
		
		const document={"_id":req.body.rno,"name":req.body.name,"marks":req.body.marks};
		collection.insertOne(document)
		.then(result=>res.send(result))
		.catch(error=>res.send(error));
	});

app.get("/gs",(req,res)=>{
		collection.find({}).toArray()
		.then(result=>res.send(result))
		.catch(error=>res.send(error));
	});

app.delete("/ds",(req,res)=>{
		const document={"_id":req.body.rno};
		collection.deleteOne(document)
		.then(result=>res.send(result))
		.catch(error=>res.send(error));
	});

app.put("/us",(req,res)=>{
		
		const filter={"_id":req.body.rno};
		const updateDoc = { $set: { "name":req.body.name,"marks":req.body.marks} }; 
		collection.findOneAndUpdate(filter,updateDoc)
		.then(result=>res.send(result))
		.catch(error=>res.send(error));
	});

app.listen(9000,()=>{console.log("ready@9000");});