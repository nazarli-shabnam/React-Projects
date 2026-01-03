import { useState } from "react";
import StarRating from "./components/index.jsx";
import "./App.css";

function App() {
  const [basicRating, setBasicRating] = useState(0);
  const [halfStarRating, setHalfStarRating] = useState(0);
  const [readOnlyRating] = useState(4.5);
  const [customRating, setCustomRating] = useState(0);
  const [largeRating, setLargeRating] = useState(0);
  const [controlledRating, setControlledRating] = useState(3);

  return (
    <div className="app">
      <header className="app-header">
        <h1>⭐ Enhanced Star Rating Component</h1>
        <p>Comprehensive examples showcasing all features</p>
      </header>

      <main className="app-main">
        <section className="example-section">
          <h2>Basic Rating</h2>
          <p>Simple 5-star rating with default settings</p>
          <StarRating
            rating={basicRating}
            onChange={setBasicRating}
            showRatingText
            showClearButton
          />
          <p className="rating-display">Current rating: {basicRating}</p>
        </section>

        <section className="example-section">
          <h2>Half-Star Rating</h2>
          <p>Allow half-star ratings (0.5 increments)</p>
          <StarRating
            rating={halfStarRating}
            onChange={setHalfStarRating}
            allowHalf
            showRatingText
            showClearButton
          />
          <p className="rating-display">Current rating: {halfStarRating}</p>
        </section>

        <section className="example-section">
          <h2>Read-Only Display</h2>
          <p>Display rating without interaction</p>
          <StarRating
            rating={readOnlyRating}
            readOnly
            allowHalf
            showRatingText
            showLabels
          />
        </section>

        <section className="example-section">
          <h2>Custom Colors & Size</h2>
          <p>Customize colors and use different sizes</p>
          <StarRating
            rating={customRating}
            onChange={setCustomRating}
            activeColor="#ff6b6b"
            inactiveColor="#e0e0e0"
            hoverColor="#ff5252"
            size="large"
            showRatingText
            showClearButton
          />
        </section>

        <section className="example-section">
          <h2>With Labels</h2>
          <p>Show text labels for each rating level</p>
          <StarRating
            rating={largeRating}
            onChange={setLargeRating}
            showLabels
            labels={["Terrible", "Bad", "Okay", "Good", "Excellent"]}
            showRatingText
            showClearButton
          />
        </section>

        <section className="example-section">
          <h2>Controlled Component</h2>
          <p>Fully controlled with external state</p>
          <StarRating
            rating={controlledRating}
            onChange={setControlledRating}
            maxRating={10}
            showRatingText
            showClearButton
          />
          <div className="controls">
            <button onClick={() => setControlledRating(5)}>Set to 5</button>
            <button onClick={() => setControlledRating(8)}>Set to 8</button>
            <button onClick={() => setControlledRating(0)}>Reset</button>
          </div>
        </section>

        <section className="example-section">
          <h2>Small Size</h2>
          <p>Compact rating for tight spaces</p>
          <StarRating
            defaultRating={3}
            size="small"
            showRatingText
          />
        </section>

        <section className="example-section">
          <h2>Custom Max Rating</h2>
          <p>10-star rating system</p>
          <StarRating
            defaultRating={7}
            maxRating={10}
            showRatingText
            readOnly
          />
        </section>

        <section className="example-section">
          <h2>With Hover Callback</h2>
          <p>Track hover events</p>
          <StarRating
            defaultRating={2}
            onHover={(rating) => console.log("Hovered:", rating)}
            showRatingText
          />
        </section>

        <section className="example-section">
          <h2>Form Integration</h2>
          <p>Works with HTML forms</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              alert(`Form submitted with rating: ${formData.get("rating")}`);
            }}
          >
            <StarRating
              name="rating"
              defaultRating={4}
              showRatingText
            />
            <button type="submit" style={{ marginTop: "10px" }}>
              Submit Form
            </button>
          </form>
        </section>

        <section className="example-section">
          <h2>Accessibility Features</h2>
          <p>Full keyboard navigation and screen reader support</p>
          <ul className="accessibility-list">
            <li>✅ Arrow keys to navigate</li>
            <li>✅ Space/Enter to select</li>
            <li>✅ Home/End for min/max</li>
            <li>✅ Escape to clear</li>
            <li>✅ ARIA attributes</li>
            <li>✅ Screen reader announcements</li>
          </ul>
          <StarRating
            defaultRating={3}
            ariaLabel="Product rating"
            showRatingText
            showClearButton
          />
        </section>
      </main>

      <footer className="app-footer">
        <p>Enhanced Star Rating Component - All improvements implemented</p>
      </footer>
    </div>
  );
}

export default App;
