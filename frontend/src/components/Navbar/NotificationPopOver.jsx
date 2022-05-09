import "./NotificationPopOver.scss";

export const NotificationPopOver = ({ popOver }) => {
  return (
    <div
      className={
        popOver === 2 ? "profile-pop-over active" : "profile-pop-over"
      }
    >
      <div className="notification-pop-over-container">
        <div className="notification-pop-over-container__arrow"></div>
        <ul>
          <li>Notification 1</li>
          <li>Notification 2</li>
          <li>Notification 3</li>
          <li>Notification 4</li>
        </ul>
      </div>
    </div>
  );
};
