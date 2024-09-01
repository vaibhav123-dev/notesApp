import { useEffect, useState } from "react";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import AddEditNotes from "./AddEditNotes";
import AddNotesImg from "../../assets/images/add-notes.svg";
import NoDataImg from "../../assets/images/no-data.svg";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import { useDispatch, useSelector } from "react-redux";
import { deleteRequest, getRequest, putRequest } from "../../common/apiRequest";
import { setNotes } from "../../redux/slices/noteSlice";
import { setUser } from "../../redux/slices/userSlice";
import SearchBar from "../../components/SearchBar/SearchBar";

const Home = () => {
  const { notes } = useSelector((state) => state?.notes) || [];
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  // Get all notes
  const getAllNotes = async () => {
    try {
      const { data } = await getRequest("/notes/get_all_notes");
      if (data) {
        dispatch(setNotes(data));
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  // Get current user
  const getCurrentUser = async () => {
    try {
      const { data } = await getRequest("/users/current_user");
      if (data) {
        dispatch(setUser(data));
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  // Delete Note
  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await deleteRequest("/notes/delete_note/" + noteId);

      if (response.data) {
        getAllNotes();
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;

    try {
      const response = await putRequest("notes/update_pinned_note/" + noteId, {
        isPinned: !noteData.isPinned,
      });

      if (response.data && response.data) {
        getAllNotes();
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  const onSearchNote = async (query) => {
    try {
      const response = await getRequest("/notes/search_note", { query });

      if (response.data && response.data) {
        dispatch(setNotes(response.data));
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    getAllNotes();
    setSearchQuery("");
  };

  useEffect(() => {
    getAllNotes();
    getCurrentUser();
    return () => {};
  }, []);

  return (
    <>
      <SearchBar
        value={searchQuery}
        onChange={({ target }) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
      <div className="container">
        {notes?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-8 m-1">
            {notes?.map((item) => {
              return (
                <NoteCard
                  key={item._id}
                  title={item.title}
                  content={item.content}
                  date={item.createdOn}
                  tags={item.tags}
                  isPinned={item.isPinned}
                  onEdit={() => handleEdit(item)}
                  onDelete={() => deleteNote(item)}
                  onPinNote={() => updateIsPinned(item)}
                />
              );
            })}
          </div>
        ) : (
          <EmptyCard
            imgSrc={!notes?.length ? NoDataImg : AddNotesImg}
            message={
              !notes?.length
                ? `Oops! No notes found matching your search.`
                : `Start creating your first note! Click the 'Add' button to jot down your
          thoughts, ideas, and reminders. Let's get started!`
            }
          />
        )}
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel="Example Modal"
        className="w-[90%] md:w-[70%] lg:w-[60%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllNotes={getAllNotes}
        />
      </Modal>
    </>
  );
};

export default Home;
