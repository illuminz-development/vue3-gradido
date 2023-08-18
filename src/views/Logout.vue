<script>
import TokenService from "../services/token.service";

export default {
    name: "logout",
    beforeMount() {
        TokenService.removeUser();

        this.$router.push('/signin');
    }
};
</script>
