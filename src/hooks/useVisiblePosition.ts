import { RefObject } from 'preact';
import { useEffect, useState } from 'preact/hooks';

interface Props {
  imgPrev: RefObject<HTMLImageElement>;
  imgNew: RefObject<HTMLImageElement>;
  refDialog: RefObject<HTMLDialogElement>;
  optionsKey: KeyframeEffectOptions;
}

export const useVisiblePosition = ({ imgNew, imgPrev, refDialog, optionsKey }: Props) => {
  const [active, setActive] = useState<boolean>(false);

  const handleSite = () => {
    setActive(true);
  };

  useEffect(() => {
    if (active) {
      const { x: xOld, y: yOld } = imgPrev.current?.getBoundingClientRect() as DOMRect;

      document.startViewTransition(() => {
        refDialog.current?.showModal();

        (imgPrev.current as HTMLImageElement).style.opacity = '0';

        const { x, y } = imgNew.current?.getBoundingClientRect() as DOMRect;

        if (imgNew.current)
          imgNew.current.animate(
            [
              { transform: `translateY(${-y + yOld}px) translateX(${-x + xOld}px)`, width: '150px', height: '150px', opacity: '1' },
              { transform: `translateY(0px) translateX(0px)`, width: '300px', height: '300px', opacity: '1' }
            ],
            optionsKey
          );
      });
    }
  }, [active]);

  const closeSite = async ({ target }: Event) => {
    if (target === refDialog.current) {
      const trans = document.startViewTransition(() => {
        refDialog.current?.close();
        (imgPrev.current as HTMLImageElement).style.opacity = '1';
      });

      await trans.finished;

      setActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', closeSite);

    return () => {
      window.removeEventListener('click', closeSite);
    };
  }, []);

  return { active, handleSite };
};
