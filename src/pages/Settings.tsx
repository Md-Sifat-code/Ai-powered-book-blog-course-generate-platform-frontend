import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const Setting = () => {
  return (
    <div>
      <Button onClick={() => toast.success("Settings saved successfully!")}>
        Setting
      </Button>
    </div>
  );
};

export default Setting;
