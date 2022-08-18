const ErrorResponse=require("../utils/ErrorResponse");

const errorHandler=(err,req,res,next) => {
  let error=err;
  error.message=err.message;

  console.log(err.stack);

  // Mongoose bad object ID
  if(err.name==="CastError") {
    const message=`Invalid resource ID ${error.value} `;
    error=new ErrorResponse(400,message);
  }

  // Mongoose Duplicate key
  if(err.code===11000) {
    const message=`Duplicate value entered`;
    error=new ErrorResponse(400,message);
  }

  // Mongoose validation error
  if(err.name==="ValidationError") {
    const message=Object.values(err.errors).map((val) => val.message);
    error=new ErrorResponse(400,message);
  }

  res
    .status(error.statusCode||500)
    .send({success: false,error: error.message||"Server error"});
};

module.exports=errorHandler;
