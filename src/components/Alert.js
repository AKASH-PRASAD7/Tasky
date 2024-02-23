import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function AlertDestructive({ alert }) {
  const { type = "", msg = "" } = alert;
  return (
    <>
      {!(type && msg) && (
        <Alert
          className={`${
            type ? `bg-lime-500 text-white` : `bg-red-500 text-white`
          } w-64 text-center mx-auto mt-2`}
        >
          <AlertTitle>{type && type}</AlertTitle>
          <AlertDescription>{msg && msg}</AlertDescription>
        </Alert>
      )}
    </>
  );
}

export default AlertDestructive;
