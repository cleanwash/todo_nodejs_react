const Task = require('../model/Task');

const taskController = {};

taskController.createTask = async (req, res) => {
try{
    const {task,isComplete} = req.body;
    const newTask = new Task({task,isComplete});
    await newTask.save();
    res.status(200).json({status:true, message:'Task created successfully'});
}catch(err){
    res.status(400).json({status:false, error:err});
}
};

taskController.getTasks = async (req, res) => {
  try{
    const taskList = await Task.find({}).select('-__v'); //.select()를 이용하면, 불필요한 부분을 편하게 제거해 줄 수 있다. -를 쓰기
    res.status(200).json({status:true, data:taskList});
  }catch(err){
    res.status(400).json({status:false, error:err});
  }
}; 

taskController.updateTask = async (req, res) => {
 try{
    const {id} = req.params; 
    console.log(id);//mongodb에 나온 id가 출력 
    const {task,isComplete} = req.body;
    //findByIdAndUpdate() 순서를 보면 1. id 2. req.body 3. {new:true}는 업데이트 된 문서를 반환 
    const updatedTask = await Task.findByIdAndUpdate(id,{task,isComplete},{new:true});
    res.status(200).json({status:true, data:updatedTask});
 }catch(err){
    res.status(400).json({status:false, error:err});
 }
};

taskController.deleteTask = async (req, res) => {
 try{
    const {id} = req.params;
    await Task.findByIdAndDelete(id);
    res.status(200).json({status:true, message:'Task deleted successfully'});
 }catch(err){
    res.status(400).json({status:false, error:err});
 }
};

module.exports = taskController;

/**
 * 여기서 data를 보내주는 이유는, 클라이언트 확인을 위해서다. 변수의 담아서 보내줄 수 있고, 굳이 변수를 안 써도 상관은 없다. 
 * 그럴 경우에, res.status(200)내용에 data에 안담아줘도 된다. 
 */