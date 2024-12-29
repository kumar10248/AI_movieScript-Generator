import { Sparkles } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { useState } from "react";
import ScriptShow from "./components/ScriptShow";
import MoonLoader from "react-spinners/MoonLoader";

const App = () => {
  const [title, setTitle] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [plot, setPlot] = useState<string>("");
  const [style, setStyle] = useState<string>("");

  const [script, setScript] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const generateScript = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = { title, genre, plot, style }
    setScript("")
    setIsLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_PUBLIC_API_URL}/script`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })
      const data = await res.json();
      // console.log(data);
      setScript(data.msg);
    } catch (error) {
      console.error(error);
      alert("Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="flex flex-col py-2 px-4 mt-10 items-center">
      <h1 className="text-4xl font-bold">AI Movie Script Generator</h1>
      <div className="flex flex-col w-full md:px-20">
        <form className="flex flex-col gap-5 w-full" onSubmit={generateScript}>
          <div className="flex flex-col gap-2">
            <label htmlFor="title">Movie Title/Concept</label>
            <Input id="title" placeholder="The Last Survivor" value={title} onChange={(e) => { setTitle(e.target.value) }} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="genre">Genre</label>
            <Input id="genre" placeholder="Science Fiction, Action, Drama" value={genre} onChange={(e) => { setGenre(e.target.value) }} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="plot">Plot synopsis</label>
            <textarea id="plot" placeholder="In a post-apocalyptic world, the last survivor discovers they're not alone and must confront the truth about humanity's fate." className="bg-transparent border border-gray-800 px-2 rounded-md resize-none" value={plot} onChange={(e) => { setPlot(e.target.value) }} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="script">Script style</label>
            <Input id="script" placeholder="dark and gritty, fast-paced, emotional" value={style} onChange={(e) => { setStyle(e.target.value) }} />
          </div>
          {!isLoading ? <Button type="submit"><Sparkles /> Generate Script</Button> : <div className="flex flex-col items-center">
            <MoonLoader color="#fff" />
          </div>}
        </form>
      </div>
      {script && <div className="mt-20">
        <ScriptShow scriptContent={script} />
      </div>}
    </div>
  );
};

export default App;