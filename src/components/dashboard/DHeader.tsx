import AltLogo from "../ui/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/shadcn/avatar";

function DHeader() {
  return (
    <>
      <div className="w-full h-[60px] bg-white border-b-[1px] border-black/20 flex font-reg justify-between items-center px-6 ">
        <AltLogo />

        <Avatar className="rounded-lg">
          <AvatarImage
            src="https://github.com/vishalpokuri.png"
            alt="@vishalpokuri"
          />
          <AvatarFallback>VP</AvatarFallback>
        </Avatar>
      </div>
    </>
  );
}

export default DHeader;
