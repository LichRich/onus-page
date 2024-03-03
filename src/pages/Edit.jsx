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
    const [link, setLink] = useState("");
    const [date, setDate] = useState("");
    const [uploadData, setUploadData] = useState({});
    const [contents, setContents] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [category, setCategory] = useState("");
    const [imgs, setImgs] = useState("");

    const [imgUrl, setImgUrl] = useState("");

    const [nowTime, setNowTime] = useState(0);

    let navigate = useNavigate();

    useEffect(() => {
        if(keyword === null) {
            let now = Date.now();
            setPostId("" + now);
            setNowTime(now);
        } else {
            const postRef = doc(db, dir, keyword);
            const getPostData = async () => {
                const docSnapshot = await getDoc(postRef);
                setPostId(docSnapshot.id);
                setTitle(docSnapshot.data().title);
                setCategory(docSnapshot.data().category);
                setLink(docSnapshot.data().link);
                setDate(docSnapshot.data().date);
                setThumbnail(docSnapshot.data().thumbnail);
                setContents(docSnapshot.data().contents);
                setImgs(docSnapshot.data().thumbnail);
                setImgUrl(docSnapshot.data().thumbnail);
            }
            getPostData();

        }
    }, [])

    useEffect(() => {
        const changeCategory = () => {
            if(category === "youtube") {
                let youtubeRadio = document.getElementById("youtube");
                youtubeRadio.checked = true;
            } else if(category === "news" ) {
                let newsRadio = document.getElementById("news");
                newsRadio.checked = true;
            }
        }
        changeCategory();
    }, [category])

    useEffect(() => {
        if(dir === null) {
            alert("잘못된 접근입니다.");
            navigate("/");
        }
    }, [])

    useEffect(() => {
        const fetchTitle = async () => {
            if(category === "youtube") {
                fetch("https://noembed.com/embed?url="+link).then(res => res.json()).then(data => {
                    setTitle(data.title);
                });
            }
        }
        fetchTitle();
    }, [link])

    const titleChangeHandler = (e) => {
        setTitle(e.currentTarget.value);
    }
    const linkChangeHandler = (e) => {
        setLink(e.currentTarget.value);
    }

    const newsThumbnailHandler = (e) => {
        setThumbnail(e.currentTarget.value);
    }

    let uploading = false;

    const thumbnailChangeHandler = (e) => {
        const name = dir + "/" + postId + "/thumbnail.jpg";
        const thumbnailRef = ref(storage, name);

        uploading = true;

        if(e.currentTarget.files[0] !== undefined) {
            if(e.currentTarget.files[0].size > 5*1024*1024) {
                alert("5MB 이하의 이미지만 가능합니다.");
                uploading = false;
                e.currentTarget.value = null;
                return;
            } else {
                uploadBytes(thumbnailRef, e.currentTarget.files[0])
                .then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((url) => {
                        setThumbnail(""+url);
                        setImgUrl(url);
                    });
                })
            }
        }
    }

    const uploadDoc = async (e) => {
        e.preventDefault();

        // 기존 게시글일 때
        if(keyword !== null) {
            if((imgUrl.length < 1 && uploading) || (imgUrl.length > 1 && uploading)) {
                alert("이미지 업로드 중입니다.");
            } else if(imgUrl.length < 1 && !uploading) {
                alert("이미지를 첨부해주세요.");
            } 
            else {
                try {
                    const docRef = await setDoc(doc(db, dir, keyword), {
                        id: keyword,
                        title: title,
                        contents: uploadData.contents,
                        thumbnail: thumbnail,
                    });
                    
                    const listRef = ref(storage, dir + "/" + postId + "/");
                    if(listAll(listRef).length > 0) {
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
                    }
                } catch (error) {
                    console.error("Error adding doc: ", error);
                } finally {
                    navigate("/"+dir);
                }
            }
        }

        // 새로운 게시글일 때
        else {
            if(Object.keys(uploadData).length === 0 || uploadData.content === '') {
                alert("내용을 입력해주세요.");
            } 
            else {
                if(imgUrl.length < 1 && uploading) {
                    alert("이미지 업로드 중입니다.");
                } else if(imgUrl.length < 1 && !uploading) {
                    alert("이미지를 첨부해주세요.");
                } else {
                    try {
                        const docRef = await setDoc(doc(db, dir, postId), {
                            id: postId,
                            title: title,
                            contents: uploadData.contents,
                            thumbnail: thumbnail
                        });
                        const listRef = ref(storage, dir + "/" + postId + "/");
                        listAll(listRef).then((res) => {
                            res.items.forEach((itemRef) => {
                                const location = itemRef._location.path_;
                                const name = location.split('/')[location.split('/').length - 1];
                                const code = name.substring(0, name.length - 4);
    
                                const isContain = uploadData.contents.includes(code);
    
                                if(!isContain) {
                                    if(code !== 'thumbnail') {
                                        deleteObject(itemRef).then(() => {
                                        }).catch((e) => {
                                            console.error(e);
                                        });
                                    }
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
    }

    const getTitle = (link) => {
        let t = "";
        fetch(link).then(res => res.json()).then(data => {
            t = data.title;
        });
        return t;
    }

    const uploadArticle = async (e) => {
        e.preventDefault();

        // 기존 게시글
        if(keyword !== null) {
            try {
                if(category === "news") {
                    const docRef = await setDoc(doc(db, dir, keyword), {
                        id: keyword,
                        title: title,
                        contents: uploadData.contents,
                        link: link,
                        category: category,
                        date: date,
                        thumbnail: thumbnail,
                    });
                } else {
                    const linkCut = link.split("?")[0];
                    const vidId = linkCut.substring(17, linkCut.length);

                    const docRef = await setDoc(doc(db, dir, keyword), {
                        id: keyword,
                        title: title,
                        contents: uploadData.contents,
                        link: link,
                        category: category,
                        date: date,
                        thumbnail: "https://img.youtube.com/vi/"+vidId+"/mqdefault.jpg",
                    });
                }
            } catch (error) {
                console.error("Error adding doc: ", error);
            } finally {
                navigate("/" + dir);
            }
        }

        // 새로운 게시글
        else {
            if(Object.keys(uploadData).length === 0 || uploadData.content === '') {
                alert("내용을 입력해주세요.");
            } else {
                const now = Date.now();
                const calcDate = new Date(now);
                const month = calcDate.getMonth() + 1;
                const uploadDate = calcDate.getFullYear() + ". " + month + ". " + calcDate.getDate();
    
                const linkCut = link.split("?")[0];
                const vidId = linkCut.substring(17, linkCut.length);
    
                try {
                    if(category === "youtube") {
                        const docRef = await setDoc(doc(db, dir, postId), {
                            id: postId,
                            title: title,
                            contents: uploadData.contents,
                            thumbnail: "https://img.youtube.com/vi/"+vidId+"/mqdefault.jpg",
                            date: uploadDate,
                            category: category,
                            link: link
                        })
                    } else {
                        const docRef = await setDoc(doc(db, dir, postId), {
                            id: postId,
                            title: title,
                            contents: uploadData.contents,
                            thumbnail: thumbnail,
                            date: uploadDate,
                            category: category,
                            link: link
                        });
                        const listRef = ref(storage, dir + "/" + postId + "/");
                        listAll(listRef).then((res) => {
                            res.items.forEach((itemRef) => {
                                const location = itemRef._location.path_;
                                const name = location.split('/')[location.split('/').length - 1];
                                const code = name.substring(0, name.length - 4);
    
                                const isContain = uploadData.contents.includes(code);
    
                                if(!isContain) {
                                    if(code !== 'thumbnail') {
                                        deleteObject(itemRef).then(() => {
                                        }).catch((e) => {
                                            console.error(e);
                                        });
                                    }
                                }
                            });
                        });
                    }
                } catch(e) {
                    console.error("Error adding doc: ", e);
                } finally {
                    navigate("/" + dir);
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

    const handleCategory = (e) => {
        setCategory(e.currentTarget.value);
    }

  return (
    <section className="editSection">

        {
            dir === "project" ?
        <form className="editContainer" onSubmit={uploadDoc}>
            <div className="titleBox">
                <input type="text" className="inputTitle" id="inputTitle" name="title" placeholder="제목:" defaultValue={keyword !== null ? title : ""} onChange={titleChangeHandler} required />
            </div>
            <div className="thumbnailBox">
                <label htmlFor="thumbnailUpload">이미지: </label>
                <input type="file" accept="image/*" id="thumbnailUpload" onChange={thumbnailChangeHandler} />
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
        :
        <form className="editContainer" onSubmit={uploadArticle}>
            <div className="categoryBox">
                <label htmlFor='youtube'>
                    <input
                        type="radio"
                        name="category"
                        value="youtube"
                        id='youtube'
                        className="categoryRadio"
                        onChange={handleCategory} required/>유튜브</label>
                <label htmlFor='news'>
                    <input
                        type="radio"
                        name="category"
                        value="news"
                        id='news'
                        className="categoryRadio" onChange={handleCategory} required/>뉴스</label>
            </div>
            {
                category === "youtube" ?
                <div className="linkBox">
                    <input type="text" className="inputLink" id="inputLink" name="Link" placeholder="링크:" defaultValue={keyword !== null ? link : ""} onChange={linkChangeHandler} required />
                </div>
                :
                <>
                    <div className="titleBox">
                        <input type="text" className="inputTitle" id="inputTitle" name="title" placeholder="제목:" defaultValue={keyword !== null ? title : ""} onChange={titleChangeHandler} required />
                    </div>
                    <div className="thumbnailBox newsThumbnail">
                        <input type="text" className="inputTitle" id="inputTitle" name="link" placeholder="이미지 링크" defaultValue={keyword !== null ? thumbnail : ""} onChange={newsThumbnailHandler} required />
                    </div>
                </>
            }
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

        }
    </section>
  )
}
