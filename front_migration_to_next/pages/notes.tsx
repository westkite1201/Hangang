import Dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddNoteForm from "../components/add-note";
import { deleteNote, loadNotes } from "../lib/slices/notesSlice";
import { RootState, RootStore } from "../store";
import { wrapper } from "../store";
const EditNoteForm = Dynamic(import("../components/edit-note"), { ssr: false });
const Notes = () => {
  const [selectedNote, setSelectedNote] = useState();
  const dispatch = useDispatch();
  const { notes } = useSelector((state: RootState) => state.notes);

  useEffect(() => {
    async function dispatchLoadNotes() {}
    dispatchLoadNotes();
  }, [dispatch]);

  const renderNote = (note) => (
    <li key={note.id}>
      <strong>{note.title}</strong>
      <br />
      <span>{note.content}</span>
      <br />
      <button
        aria-label={`Delete note with title: ${note.title}`}
        onClick={() => dispatch(deleteNote(note.id))}
      >
        🗑️
      </button>
      <button
        onClick={() => setSelectedNote(note)}
        aria-label={`Edit note with title: ${note.title}`}
      >
        ✏️
      </button>
    </li>
  );

  return (
    <>
      <Head>
        <title>Next.js with Redux Toolkit | Notes App</title>
      </Head>
      <AddNoteForm />
      <hr />
      <h3>All Notes</h3>
      <ul>{notes && notes.map(renderNote)}</ul>
      <EditNoteForm note={selectedNote} />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    await store.dispatch<any>(loadNotes());
    //console.log(store.dispatch);
    //store.dispatch(loadNotes(3));
  }
);
export default Notes;
