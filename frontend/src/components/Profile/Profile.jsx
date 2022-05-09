import "./profile.scss";
import profileImage from "./profileblue.jpg";

function Profile() {
  return (
    <div class="container_align_profile">
      <div class="container_profile_form">
        <div class="container_profile_image">
          <img
            class="container_profile_image_img"
            src={profileImage}
            alt="no-foto"
          />
        </div>

        <div class="container_profile_input ic1">
          <input
            id="firstname"
            class="profile_input"
            type="text"
            placeholder=" "
          />
          <div class="cut"></div>
          <label for="firstname" class="profile_placeholder">
            First name
          </label>
        </div>

        <div class="container_profile_input ic1">
          <input
            id="firstname"
            class="profile_input"
            type="text"
            placeholder=" "
          />
          <div class="cut"></div>
          <label for="firstname" class="profile_placeholder">
            E - Mail
          </label>
        </div>

        <div class="container_profile_input ic1">
          <input
            id="firstname"
            class="profile_input"
            type="text"
            placeholder=" "
          />
          <div class="cut"></div>
          <label for="firstname" class="profile_placeholder">
            Password
          </label>
        </div>

        <button class="button_profile_delete" href="">
          Delete User
        </button>
      </div>
    </div>
  );
}

export default Profile;
