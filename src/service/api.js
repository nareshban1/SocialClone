import { firestore } from "../Firebase";


export const fetchPost = async() => {
    const posts = new Array();
    const querySnapshot = await firestore.collection("posts").orderBy('timestamp', "desc").limit(10).get();
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
    querySnapshot.forEach((doc)=> {
        let postData = doc.data();
        postData.postID = doc.id;
        posts.push(postData);
    });
    return {posts,lastVisible};
}

export const fetchMorePost = async(startAfter) => {
    const posts = new Array();
    const querySnapshot = await firestore.collection("posts").orderBy('timestamp', "desc").startAfter(startAfter).limit(10).get();
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
    querySnapshot.forEach((doc)=> {
        let postData = doc.data();
        postData.postID = doc.id;
        posts.push(postData);
    });
    return {posts,lastVisible};
}


