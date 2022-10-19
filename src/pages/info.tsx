import { changeList, isChangeListDone, lastUpdated, readme } from "helpers";

const InfoPage = () => {
    return (
        <main className="container theme">
            <h1 style={{ textAlign: "center" }}>README</h1>
            <p>{readme}</p>
            <br />
            <hr />
            <br />
            <p>Username: hackerman123</p>
            <p>Password: 12345</p>
            <br />
            <hr />
            <br />
            <h1>Upcoming Changes</h1>
            <br />
            <h3>Last Updated: {lastUpdated}</h3>
            <br />
            {!isChangeListDone && <h6>This list is not conclusive</h6>}
            <br />
            <div className="change-list">
                {changeList.map((str) => (
                    <p>{str}</p>
                ))}
            </div>
        </main>
    );
};

export default InfoPage;
