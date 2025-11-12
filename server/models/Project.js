import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
   
    title: { type: String, required: true, trim: true },
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    completion: { type: Date, required: true },
    description: { type: String, required: true, trim: true },

   
    img: { type: String, trim: true, default: "" },              
    tech: { type: [String], default: [] },                      
    demo: { type: String, trim: true, default: "" },             
    code: { type: String, trim: true, default: "" },            
    isDefault: { type: Boolean, default: false },                
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);

