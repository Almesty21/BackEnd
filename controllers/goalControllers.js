const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
    //@desc Get Goals
    //@route  Get /api/goals
    //@access Private
const getGoals = asyncHandler(async(req, res) => {
        const goals = await Goal.Find()
        res.status(200).json(goals)
            //res.status(200).json({ message: 'Get Goals' })
    })
    //@desc set Goals
    //@route  Post /api/goals
    //@access Private
const setGoals = asyncHandler(async(req, res) => {
        //console.log(req.body)
        if (!req.body.text) {
            // res.status(400).json({ message: 'Please add a text Field' })
            res.status(400)
            throw new Error('Please add a text Field')
        }
        const goal = await Goal.creat({
            text: req.body.text
        })
        res.status(200).json(goal)
    })
    //@desc Update Goals
    //@route  Put /api/goals/:id
    //@access Private
const updateGoals = asyncHandler(async(req, res) => {
       const goal =await Goal.findById(req.params.id)
       if(!goal){
		   res.status(400)
		   throw new Error('Goal not found')
	   }       
	   const updateGoals=await Goal.findByIdAndUpdate(req.params.id,req,body,
	   {
		   new : true,
	   })
	   //res.status(200).json({ message: `Update Goals ${req.params.id}` })
	   res.status(200).json(updateGoals)
    })
    //@desc Delete Goals
    //@route  DELETE /api/goals/:id
    //@access Private
const deleteGoals = asyncHandler(async(req, res) => {
const goal =await Goal.findById(req.params.id)
       if(!goal){
		   res.status(400)
		   throw new Error('Goal not found')
	   }   
      await goal.remove()
res.status(200).json({id:req.params.id})	  
    //res.status(200).json({ message: `Delete Goals ${req.params.id}` })
})
module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}