import React, { useEffect } from 'react'

function LocationTabs() {

  useEffect(() => {
    resetTabs();
  }, [])

  /**
     * Toggles between the search and saved location tabs.
     * 
     * @param event - The event that triggered the toggle.
     */
  const toggleTabs = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('active')) return;

    const tabs = document.querySelectorAll("#locationTabs button");
    const sections = document.querySelectorAll("section.search, section.saved");

    tabs.forEach(tab => tab.classList.toggle("active"));
    sections.forEach(section => section.classList.toggle("active"));
  }

  const resetTabs = () => {
    const tabs = document.querySelectorAll("#locationTabs button");
    const sections = document.querySelectorAll("section.search, section.saved");

    tabs.forEach(tab => tab.classList.remove("active"));
    tabs[0].classList.add("active");
    sections.forEach(section => section.classList.remove("active"));
    sections[0].classList.add("active");
  }

  return (
    <div id="locationTabs" onClick={toggleTabs}>
      <button className="active">Add Location</button>
      <button>Saved Locations</button>
    </div>
  )
}

export default LocationTabs
