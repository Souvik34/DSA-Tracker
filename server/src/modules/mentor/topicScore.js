export const calculateTopicScore = (topic)=>{


    const solved = Number(topic.solved);



    // How much exposure user has
    const exposure =
        Math.min(
            (solved / 20) * 100,
            100
        );



    // How recently user practiced
    const daysOld =
        (
            Date.now()
            -
            new Date(topic.last_solved)
        )
        /
        (
            1000 * 60 * 60 * 24
        );



    let recency;


    if(daysOld < 7)
        recency = 100;

    else if(daysOld < 30)
        recency = 70;

    else if(daysOld < 90)
        recency = 40;

    else
        recency = 20;




    // Difficulty exposure
    const difficulty =
        Math.min(
            (Number(topic.medium) * 5)
            +
            (Number(topic.hard) * 10),
            100
        );




    const score =
        (
            exposure * 0.4
            +
            recency * 0.3
            +
            difficulty * 0.3
        );




    let type;



    if(solved < 3){

        type = "coverage_gap";

    }

    else if(score < 45){

        type = "weakness";

    }

    else{

        type = "healthy";

    }

    
    const confidence =
    Math.min(
        solved / 10 * 100,
        100
    );


    return {

        ...topic,
        score: Math.round(score),
        confidence:Math.round(confidence),

        type

    };

};



export const findFocusTopic = (topics)=>{


    if(!topics || topics.length===0)
        return null;



    return topics

    .map(topic=>calculateTopicScore(topic))

    .sort(
        (a,b)=>a.score-b.score
    )

    [0];


};