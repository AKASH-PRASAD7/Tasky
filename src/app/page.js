import Header from "@/components/Header";
import SideNav from "@/components/SideNav";
import TaskContent from "@/components/TaskContent";

export default function Home() {
  return (
    <main>
      <Header />
      <section className="grid grid-cols-5">
        <div>
          {" "}
          <SideNav />{" "}
        </div>
        <div className="col-span-4">
          <TaskContent />
        </div>
      </section>
    </main>
  );
}
