import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">

        <h1 className="head_text text-center">
        Découvrez & Partagez des
            <br className="max-md:hidden"/>
            <span className="orange_gradient text-center">
             Prompts alimentés par l'IA.
            </span>
            <p className="desc text-center">
            Promptopia est un outil open-source de prompt d'IA conçu pour le monde moderne, permettant de découvrir, créer et partager des prompts créatifs.
            </p>
        </h1>

        <Feed /> 
    </section>
  )
}

export default Home