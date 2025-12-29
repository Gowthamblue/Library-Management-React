import API from "./apiConfig";
export async function getAllBooks() {
  const res = await API.get("/admin/books");
  return res.data;
}

export async function addBook(bookData) {
  const res = await API.post("/admin/books", bookData, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
}


export async function searchBooks(keyword) {
  try {
    const res = await API.get("/admin/search/"+keyword);
    return res.data;
  } catch (error) {
    console.error("Error searching books:", error);
    throw error;
  }


}

export async function searchBooksForMember(keyword) {
  try {
    const memberId = localStorage.getItem("memberId");
    
    const res = await API.get("/members/search/"+keyword, {
      headers: { "X-Member-Id": memberId },
    });
    
    return res.data;
  } catch (error) {
    console.error("Error searching books:", error);
    throw error;
  }
}

//Bookstatus.jsx

export const booksapi = async() =>{
  const res = await API.get("/admin/books"); 
  return res;
}
  

export  const checkstatusapi = async (book) =>{

 const res = await API.post(
        "/admin/borrowers",
        { bookId: book.book_id } 
      );
      return res;
}


//MemberDetails.jsx

export const allMemberFetchapi = async () =>{
  const res = await API.get("/admin/allMembers");
  return res;
}


export const fetchMembersBookapi = async (memberId) =>{
  const res = await API.post("/admin/viewCheckOuts", {
    memberId: memberId,
  });
  return res;
}


export const updateBook = async (bookData) => {
  const res = await API.put("/admin/update", bookData, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
}