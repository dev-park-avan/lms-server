import { prisma } from "../lib/schema.js";
import { sendAutoReply, sendEmailToAdmin } from "../utils/mailer.js";
import { contactUsSchemaType } from "../validations/contact-us.validation.js";

export const contactUsService = async (body: contactUsSchemaType) => {
  const { firstName, lastName, email, message } = body;
  console.log("dooooooo", firstName, lastName, email, message);

  const contact = await prisma.contactMessage.create({
    data: { firstName, lastName, email, message },
  });

  sendEmailToAdmin({
    firstName,
    lastName,
    email,
    message,
  }).catch(console.error);

  sendAutoReply({
    email,
    firstName,
    lastName,
  }).catch(console.error);
};
