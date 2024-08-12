import { useRef } from 'preact/hooks';
import { useVisiblePosition } from '../hooks/useVisiblePosition';

interface Props {
  title: string;
  description: string;
  IMGs: string[];
}

export const Site = ({ title, description, IMGs }: Props) => {
  const imgPrev = useRef<HTMLImageElement>(null);
  const imgNew = useRef<HTMLImageElement>(null);
  const refDialog = useRef<HTMLDialogElement>(null);

  const { handleSite, active } = useVisiblePosition({
    imgNew,
    imgPrev,
    refDialog,
    optionsKey: {
      duration: 600,
      iterations: 1,
      easing: 'ease'
    }
  });

  return (
    <>
      <figure onClick={handleSite}>
        <img ref={imgPrev} class="img-old" src={IMGs[0]} alt="example" />
        <figcaption>{title}</figcaption>
      </figure>
      {active && (
        <dialog ref={refDialog} class="modal">
          <article>
            <picture>
              <img ref={imgNew} class="img-new" src={IMGs[0]} alt="example" />
            </picture>
            <h3>{title}</h3>

            <p>{description}</p>
          </article>
        </dialog>
      )}
    </>
  );
};
