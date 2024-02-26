import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";

import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { storage } from "../FirebaseConfig";

export default function Edit({db}) {

    let location = useLocation();
    const search = location.search;
    const params = new URLSearchParams(search);
    const dir = params.get('dir');
    const keyword = params.get('id');

    const [postId, setPostId] = useState("");
    const [title, setTitle] = useState("");
    const [uploadData, setUploadData] = useState({});
    const [contents, setContents] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [category, setCategory] = useState("");
    const [imgs, setImgs] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        if(keyword === undefined) {
            setPostId("" + Date.now());
        } else {
            const postRef = doc(db, dir, keyword);
            const getPostData = async () => {
                const docSnapshot = await getDoc(postRef);
                setPostId(docSnapshot.id);
                setTitle(docSnapshot.data().title);
                setCategory(docSnapshot.data().category);
                setThumbnail(docSnapshot.data().imgs[0]);
                setContents(docSnapshot.data().contents);
                setImgs(docSnapshot.data().imgs);
            }
            getPostData();
        }
    }, [])

    useEffect(() => {
        if(dir === undefined) {
            alert("잘못된 접근입니다.");
            navigate("/");
        }
    }, [])

    const titleChangeHandler = (e) => {
        setTitle(e.currentTarget.value);
    }

    const thumbnailChangeHandler = (e) => {

    }

    const uploadDoc = async (e) => {
        e.preventDefault();

        // 기존 게시글일 때
        if(keyword !== undefined) {
            try {
                const docRef = await setDoc(doc(db, dir, keyword), {
                    id: keyword,
                    title: title,
                    contents: contents,
                    imgs: imgs
                });
                const listRef = ref(storage, dir + "/" + postId + "/");
                listAll(listRef).then((res) => {
                    res.items.forEach((itemRef) => {
                        const location = itemRef._location.path_;
                        const name = location.split('/')[location.split('/').length - 1];
                        const code = name.substring(0, name.length - 4);

                        const isContain = uploadData.contents.includes(code);

                        if(!isContain) {
                            deleteObject(itemRef).then(() => {}).catch((e) => {});
                        }
                    });
                });
            } catch (error) {
                console.error("Error adding doc: ", error);
            } finally {
                navigate("/"+dir);
            }
        }

        // 새로운 게시글일 때
        else {
            if(Object.keys(uploadData).length === 0 || uploadData.content === '') {
                alert("내용을 입력해주세요.");
            } 
            else {
                try {
                    const docRef = await setDoc(doc(db, dir, postId), {
                        id: postId,
                        title: title,
                        contents: uploadData.contents
                    });
                    const listRef = ref(storage, dir + "/" + postId + "/");
                    listAll(listRef).then((res) => {
                        res.items.forEach((itemRef) => {
                            const location = itemRef._location.path_;
                            const name = location.split('/')[location.split('/').length - 1];
                            const code = name.substring(0, name.length - 4);

                            const isContain = uploadData.contents.includes(code);

                            if(!isContain) {
                                deleteObject(itemRef).then(()=>{}).catch((e) => {});
                            }
                        });
                    });
                } catch (e) {
                    console.error("Error adding doc: ", e);
                } finally {
                    navigate("/"+dir);
                }
            }
        }
    }

    const cancelHandler = () => {
        navigate(-1);
    }

    class EditUploadAdapter {
        constructor(loader) {
            this.loader = loader;
        }

        upload() {
            let now = Date.now();
            let imgName = dir + "/" + postId + "/" + now + ".jpg";

            return this
                .loader
                .file
                .then((file) => 
                    new Promise((resolve, reject) => {
                        uploadBytes(ref(storage, imgName), file)
                        .then((snapshot) => {
                            return getDownloadURL(snapshot.ref);
                        })
                        .then((downloadURL) => {
                            resolve({default:downloadURL});
                        })
                        .catch((err) => {
                            reject(err.message);
                        })
                    })
                );
        }
    }

  return (
    <section className="editSection">

        <form className="editContainer" onSubmit={uploadDoc}>
            <div className="titleBox">
                <input type="text" className="inputTitle" id="inputTitle" name="title" placeholder="제목:" defaultValue={keyword !== undefined ? title : ""} onChange={titleChangeHandler} required />
            </div>
            <div className="editorBox">
                <CKEditor
                    name="editor"
                    editor={ClassicEditor}
                    data={keyword !== undefined ? contents : ""}
                    onReady={
                        editor => {
                            editor.plugins.get("FileRepository").createUploadAdapter = loader => {
                                return new EditUploadAdapter(loader);
                        };
                    }}
                    onChange={
                        (e, editor) => {
                            const data = {
                                writer: "admin",
                                contents: editor.getData()
                            };
                            setUploadData(data);
                        }
                    } />
            </div>
            <div className="buttonBox">
                <button type="submit" className="btnEditSubmit editBtns">저장</button>
                <button type="button" className="btnEditCancel editBtns" onClick={() => cancelHandler()}>취소</button>
            </div>
        </form>
    </section>
  )
}
