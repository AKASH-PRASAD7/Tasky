import Header from "@/components/Header";
import SideNav from "@/components/SideNav";
import TaskContent from "@/components/TaskContent";
import Analytics from "@/components/Analytics";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="hidden  lg:block">
        <section className=" grid grid-cols-12">
          <div>
            {" "}
            <SideNav />{" "}
          </div>

          <div className=" col-span-8 min-h-screen ">
            <TaskContent />
          </div>
          <div>
            <Analytics />
          </div>
        </section>
        <section className=" grid grid-cols-12">
          <div>
            {" "}
            <SideNav />{" "}
          </div>

          <div className=" col-span-8 min-h-screen ">
            <TaskContent />
          </div>
          <div>
            <Analytics />
          </div>
        </section>
      </div>
      {/* mobile */}

      {/* <div className="block  lg:hidden">
        <section className="flex flex-col justify-center items-center ">
          <div className="sticky bottom-0">
            {" "}
            <SideNav />
          </div>

          <div className="  ">
            <Analytics />
          </div>
          <div>
            <TaskContent />
          </div>
        </section>
        <section className=" ">
          <div>
            <SideNav />
          </div>

          <div className=" col-span-8 min-h-screen ">
            <TaskContent />
          </div>
          <div>
            <Analytics />
          </div>
        </section>
      </div> */}
    </main>
  );
}
