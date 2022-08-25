const HomePage = () => {
    const seed = () => {
        fetch("/api/seed");
    };
    return (
        <div>
            <h1>Hello World</h1>
            <button onClick={seed}>Seed</button>
        </div>
    );
};

export default HomePage;
