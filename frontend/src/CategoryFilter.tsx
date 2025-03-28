import { useEffect, useState } from "react";
import './CategoryFilter.css';

function CategoryFilter ()
{
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://localhost:5000/Book/GetAllCategories');
                const data = await response.json();
                console.log('Fetched categories: ', data)
                setCategories(data);
        
            } catch (error) {
            console.error('Error fetching categories', error);
            }
        };

        fetchCategories();
    }, [])

    return (
        <div className="category_filter">
            <h5>Category</h5>
            <div className="category_list">
                {categories.map((c) => (
                    <div className="category_item" key={c}>
                        <input className="category_checkbox" type="checkbox" id={c} value={c} />
                        <label htmlFor={c}>{c}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryFilter