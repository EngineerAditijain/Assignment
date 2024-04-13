'use strict';

const LikeButton = () => {
  const [responseData, setResponseData] = React.useState(null);

  const handlePostData = async () => {
    const phoneNumber = '1234567890'; 
    const response = await fetch('https://chimpu.xyz/api/post.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phonenumber: phoneNumber })
    });

    // Get and display the response headers
    const headers = Array.from(response.headers.entries());
   
    setResponseData(headers);
  };

  return (
    <div style={{display:"flex", justifyContent:"center",alignItems:"center", flexDirection:"column"}}>
      <button onClick={handlePostData}>Send POST Request</button>
      <div style={{display:"flex", justifyContent:"center",alignItems:"center"}}>
        <h2>Response Headers:</h2>
        <ul>
          {responseData &&
            responseData.map(([key, value], index) => (
              <li key={index}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
        </ul>
      </div>
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
