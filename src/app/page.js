import Header from "@/components/Header";
import SideNav from "@/components/SideNav";
import TaskContent from "@/components/TaskContent";
import Analytics from "@/components/Analytics";

export default function Home() {
  return (
    <main>
      <Header />
      <section className="grid grid-cols-12">
        <div>
          {" "}
          <SideNav />{" "}
        </div>
        <div className="col-span-8 min-h-screen ">
          <TaskContent />
        </div>
        <div>
          <Analytics />
        </div>
      </section>
    </main>
  );
}
