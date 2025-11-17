require("dotenv").config();
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.createBlog = functions.https.onCall(async (data, context) => {
  
  const adminEmail = process.env.BLOG_ADMIN_EMAIL;
  const adminUid = process.env.BLOG_ADMIN_UID;

  if (!context.auth || context.auth.uid !== adminUid) {
    throw new functions.https.HttpsError(
      "permission-denied",
      "Only admin can create blog posts."
    );
  }

  const blog = {
    title: data.title,
    content: data.content,
    createdAt: Date.now(),
  };

  return admin.firestore().collection("blogs").add(blog);
});
