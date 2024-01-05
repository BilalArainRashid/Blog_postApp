import { db } from '../db.js'

// update user profile 

export const updatedProfile = (req, res) => {
    const q = "UPDATE user SET username = ?, email = ? WHERE id = ?";
    const values = [req.body.username, req.body.email, req.user.id]
    db.query(q, [values], (err, data)  => {
        if(err) return res.status(500).json({error: err})
        return res.status(200).json("Profile has been updated successfully...")
    })
}