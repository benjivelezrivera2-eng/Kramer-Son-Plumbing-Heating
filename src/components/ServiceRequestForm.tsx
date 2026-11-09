import { useState } from "react";
import { BookingConfirmation, BookingForm, type BookingDraft } from "./BookingDialog";

export function ServiceRequestForm(): JSX.Element {
  const [booked, setBooked] = useState<BookingDraft | null>(null);
  const [another, setAnother] = useState(false);

  if (booked) {
    return (
      <BookingConfirmation
        draft={booked}
        onDone={() => {
          setAnother(false);
          setBooked(null);
        }}
        onBookAnother={() => {
          setAnother(true);
          setBooked(null);
        }}
      />
    );
  }

  return <BookingForm idPrefix="contact-book" focusName={another} onConfirm={setBooked} />;
}
