'use strict';

const LikeButton = () => {
  const [liked, setLiked] = React.useState(false);
  const [formData, setFormData] = React.useState([]);
  if (liked) {
    return 'You liked this.';
  }
  const handleChange = (e,colIndex, rowIndex) =>{
  
    const updatedFormData = [...formData];
    updatedFormData[rowIndex] = { ...updatedFormData[rowIndex], [colIndex]: e.target.value };
    setFormData(updatedFormData);
  }

  const handleSubmit = () => {
    // Post formData to the API
    console.log("FormData:", formData);
    // Reset the form after submission if needed
    setFormData([]);
  };

  const names = ['Onboarding Call',
    'Google Search console Access',
    'Google Analytics Access',
    'Website Access',
    'Technical Audit',
    'Anchor Text And Semantic Analysis',
    'Competetior Analysis',
    'Anchor Text/URL Mapping',
    'Google Data Studio Report +Local reporting ',
    'Site Level Optimization',
    'On Page Optimization',
    'Content Creation',
    'Content Publishing',
    'Premium Press Release',
    'Authority Niche Placements',
    'Review Management',
    'Index Links',
    'Video Recap'];

  const rows = names.map((name, index) => (
    <tr key={index}>
      <td style={{ border: '1px solid #e7e7e7', textAlign: "center", width: "25%", backgroundColor:"#f6f7f7" }}>{name}</td>
      {[...Array(4)].map((_, i) => (
        <td key={i} style={{ border: '1px solid #e7e7e7' }}>
          <input type="text" style={{ width: "100%", boxSizing: "border-box", height: "100%",border:"none" }} onChange={(e) =>handleChange(e,i,index)} />
        </td>
      ))}
    </tr>
  ));

  return (
    <div style={{ width: "99vw", height: "97vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <table style={{ borderCollapse: 'collapse', border: '1px solid #e7e7e7', width: "90%", height: "90%" }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #e7e7e7', textAlign: "center", marginLeft: "2",backgroundColor:"#f6f7f7"  }} colSpan="7">Month 1</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
      {/* <button onClick={handleSubmit}>Submit</button> */}
    </div>
  );
};

const domContainer = document.querySelector('#like_button_container');
if (domContainer) {
  const root = ReactDOM.createRoot(domContainer);
  root.render(<LikeButton />);
} else {
  console.error('Could not find the DOM container');
}
