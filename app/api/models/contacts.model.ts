import mongoose from "mongoose";
import contactsSchema from "../schemas/contacts.schema";

const ContactModel = mongoose.model('Contacts', contactsSchema);

export default ContactModel;
