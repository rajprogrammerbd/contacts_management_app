import mongoose from "mongoose";
import contactsSchema from "../schemas/contacts.schema";

const ContactModel = mongoose.models.Contacts || mongoose.model('Contacts', contactsSchema);

export default ContactModel;
