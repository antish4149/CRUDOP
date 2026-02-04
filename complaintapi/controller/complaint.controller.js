let complaints = [
    {
        id:1,
        title:"Electricity",
        description:"Not working",
        status:"open",
    }
];

export const getComplaints = (req,res)=>{
    res.status(200).json(complaints);
}

export const createComplaint = (req,res)=>{
    const {id,title , description} = req.body;

    const newComplaint = {
        id:id,
        title:title,
        description:description,
        status:"open"
    }

    complaints.push(newComplaint);
    res.status(200).json(newComplaint);
}

export const resolveComplaint = (req, res) => {
  const id = Number(req.params.id);

  const complaint = complaints.find(c => c.id === id);
  if (!complaint) {
    return res.status(404).json({ message: "Complaint not found" });
  }

  complaint.status = "resolved";
  res.status(200).json(complaint);
};

export const deleteComplaint = (req, res) => {
  const id = Number(req.params.id);

  const index = complaints.findIndex(c => c.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Complaint not found" });
  }

  const deletedComplaint = complaints[index];
  complaints.splice(index, 1);

  return res.status(200).json(deletedComplaint);
};