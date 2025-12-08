import { Search } from "lucide-react";

const SearchBar = ({ value, onChange, onSearch }) => (
  <section className="card">
    <div className="card-body p-2">
      <div className="join w-full">
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder="Search by tags (e.g., design, coding, writing)"
            className="input input-lg input-bordered join-item w-full pl-14 focus:outline-offset-0"
            aria-label="Search contests by tags"
          />
          <Search 
            className="absolute left-5 top-1/2 transform -translate-y-1/2 text-base-content/50" 
            size={22}
            aria-hidden="true"
          />
        </div>
        <button 
          onClick={onSearch}
          className="btn btn-primary btn-lg join-item px-8 text-base font-semibold"
          aria-label="Search"
        >
          Search
        </button>
      </div>
    </div>
  </section>
);
export default SearchBar;