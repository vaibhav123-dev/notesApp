/* eslint-disable react/prop-types */
import moment from "moment";
import { MdOutlinePushPin } from "react-icons/md";
import { MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="border rounded p-4 bg-slate-800 text-white  dark:bg-white dark:text-black hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs dark:text-slate-500">
            {date ? moment(date).format("Do MMM YYYY") : "-"}
          </span>
        </div>

        <MdOutlinePushPin
          className={`icon-btn ${
            isPinned ? "text-primary" : "dark:text-slate-800"
          }`}
          onClick={onPinNote}
        />
      </div>

      <p className="text-xs dark:text-slate-600 mt-2">
        {content?.slice(0, 60)}
      </p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs dark:text-slate-500">
          {tags.map((item) => `#${item} `)}
        </div>

        <div className="flex items-center gap-2 ">
          <MdCreate
            className="icon-btn dark:text-slate-800 hover:text-green-600"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn dark:text-slate-800 hover:text-red-500"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
