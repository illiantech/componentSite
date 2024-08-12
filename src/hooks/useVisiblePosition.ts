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

        const { x, y } = imgNew.current?.getBoundingClientRect() as DOMRect;

        const keyFrame = new KeyframeEffect(
          imgNew.current,
          [
            { transform: `translateY(${-y + yOld}px) translateX(${-x + xOld}px)`, width: '200px', height: '200px', opacity: '0.6' },
            { transform: `translateY(0px) translateX(0px)`, width: '500px', height: '500px', opacity: '1' }
          ],
          optionsKey
        );

        const AnimationKey = new Animation(keyFrame);

        AnimationKey.play();
      });
    }
  }, [active]);

  const closeSite = async ({ target }: Event) => {
    if (target === refDialog.current) {
      const trans = document.startViewTransition(() => {
        refDialog.current?.close();
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
