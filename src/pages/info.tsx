import { changeList, lastUpdated } from "helpers";

const InfoPage = () => {
    return (
        <main className="container theme">
            <h1>Upcoming Changes</h1>
            <br />
            <h6>Last Updated: {lastUpdated}</h6>
            <br />
            <div className="change-list">
                {changeList.map((str) => (
                    <p key={str}>{str}</p>
                ))}
            </div>
        </main>
    );
};

export default InfoPage;
