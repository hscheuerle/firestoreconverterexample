import * as functions from 'firebase-functions';

export const onCreatePost = functions.firestore
  .document('posts/{id}')
  .onCreate(async (snapshot, _) => {
    const { createTime } = snapshot;
    await snapshot.ref.update({ createTime });
  });
